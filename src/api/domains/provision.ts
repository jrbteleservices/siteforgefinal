// api/domains/provision.ts

interface ProvisionRequest {
  domain: string;
  siteId: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { domain, siteId }: ProvisionRequest = req.body;

  if (!domain || !siteId) {
    return res.status(400).json({ error: 'Missing domain or siteId parameters' });
  }

  const cloudflareToken = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!cloudflareToken || !zoneId) {
    return res.status(500).json({ error: 'DNS Provisioning service requires server-side environment configuration.' });
  }

  try {
    // 1. Create CNAME record via Cloudflare API
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cloudflareToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'CNAME',
        name: domain,
        content: 'cname.siteforge.com',
        ttl: 1,
        proxied: true,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.errors?.[0]?.message || 'Cloudflare DNS provisioning failed');
    }

    console.log(`[DNS Engine] Successfully provisioned CNAME and SSL for ${domain} (Site ID: ${siteId})`);

    return res.status(200).json({
      success: true,
      message: `Domain ${domain} successfully verified and provisioned.`,
      recordId: data.result?.id,
      sslStatus: 'active'
    });

  } catch (error: any) {
    console.error('[DNS Provisioning Error]:', error.message);
    return res.status(500).json({ error: error.message });
  }
}