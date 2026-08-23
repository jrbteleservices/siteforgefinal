// src/api/chat.ts
import { supabase } from '../supabase';

export async function processConciergeMessage(websiteId: string, sessionId: string, message: string, siteData: any) {
  const lower = message.toLowerCase();

  let matchedAnswer = '';

  // 1. Check FAQs
  if (siteData.faqList) {
    const foundFaq = siteData.faqList.find((f: any) => 
      f.question.toLowerCase().includes(lower) || lower.includes(f.question.toLowerCase().substring(0, 10))
    );
    if (foundFaq) matchedAnswer = foundFaq.answer;
  }

  // 2. Check Products & Pricing
  if (!matchedAnswer && siteData.products) {
    const foundProd = siteData.products.find((p: any) => lower.includes(p.name.toLowerCase()) || lower.includes('price') || lower.includes('cost') || lower.includes('how much'));
    if (foundProd && (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes(foundProd.name.toLowerCase()))) {
      matchedAnswer = `The price for "${foundProd.name}" is $${foundProd.price}. ${foundProd.desc ? foundProd.desc : ''} You can check it out in our Services & Packages section!`;
    }
  }

  // 3. Check Services / What We Do
  if (!matchedAnswer && (lower.includes('service') || lower.includes('offer') || lower.includes('what do you'))) {
    const services = siteData.servicesList?.map((s: any) => s.title).join(', ') || 'our core industry solutions';
    matchedAnswer = `We specialize in: ${services}. Would you like me to have our team contact you with more details?`;
  }

  // 4. Check Hours of Operation
  if (!matchedAnswer && (lower.includes('hour') || lower.includes('open') || lower.includes('time') || lower.includes('schedule'))) {
    matchedAnswer = siteData.operatingHours?.length > 0 
      ? `Our hours are: ${siteData.operatingHours.map((oh: any) => `${oh.days}: ${oh.hours}`).join(' | ')}`
      : `We are open Monday to Saturday during standard business hours. Feel free to reach out anytime!`;
  }

  // 5. Check Location / Address
  if (!matchedAnswer && (lower.includes('address') || lower.includes('location') || lower.includes('where') || lower.includes('suburb'))) {
    matchedAnswer = `Our main office is located at ${siteData.streetAddress}, ${siteData.suburb}, ${siteData.city}.`;
  }

  // 6. Fallback & Lead Capture Trigger
  if (!matchedAnswer) {
    await supabase.from('unanswered_questions').insert([{ website_id: websiteId || 'default', question: message }]);
    matchedAnswer = `I don't have that specific information listed right now, but I can have someone from the team confirm it for you. What's your name and best phone number?`;
  }

  return { reply: matchedAnswer };
}