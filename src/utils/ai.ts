export async function generateAiContent(businessType: string, suburb: string, promptType: 'headline' | 'description') {
  // Simulating intelligent AI copywriting tailored for trade businesses
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (promptType === 'headline') {
    const headlines = [
      `Expert ${businessType} Services & Fast Repairs in ${suburb}`,
      `Trusted Local ${businessType} Professionals Serving ${suburb}`,
      `24/7 Emergency ${businessType} Solutions in ${suburb}`
    ];
    return headlines[Math.floor(Math.random() * headlines.length)];
  } else {
    return `Licensed, insured, and certified ${businessType.toLowerCase()} specialists providing top-tier residential and commercial solutions across ${suburb} with transparent pricing and guaranteed workmanship.`;
  }
}