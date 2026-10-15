import { priceLabel, site } from '@/lib/site';

export default function Faq() {
  return (
    <section className="sec gutter" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head center"><span className="eyebrow">Questions</span><h2>Before you book</h2></div>
        <div className="faq">
          <details open><summary>Do I need any experience?</summary><p>No. The workshop starts from the first fold. Beginners, makeup artists and boutique owners all learn together, and Yashmin works with each person at their pace.</p></details>
          <details><summary>What is the fee?</summary><p>{`${priceLabel} per person. Register using the form below and we will reply on WhatsApp with the payment details.`}</p></details>
          <details><summary>Where exactly is it?</summary><p>{`${site.workshop.venue}, ${site.address.locality}. Our studio is close by, near Anandha Stores, Padmavathi Nagar, Iyyappanthangal, ${site.address.locality} ${site.address.postalCode}.`}</p></details>
          <details><summary>How do I confirm my seat?</summary><p>Fill in the form below and send it to us on WhatsApp, Your seat is confirmed once we reply with the payment details and receive payment.</p></details>
          <details><summary>What should I bring?</summary><p>We will send a short checklist on WhatsApp after you register.</p></details>
        </div>
      </div>
    </section>
  );
}
