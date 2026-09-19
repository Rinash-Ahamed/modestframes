import { getInquiries } from "@/lib/db";
import { InquiryRow } from "@/components/InquiryRow";

export default function AdminInquiriesPage() {
  const inquiries = getInquiries();

  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">Contact requests</p>
        <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-bone">Enquiries</h1>
        <p className="mt-2 font-editorial text-lg text-stone">Messages submitted through the public contact form.</p>
      </header>

      <section className="admin-panel divide-y divide-bone/10">
        {inquiries.map((inquiry) => <InquiryRow key={inquiry.id} inquiry={inquiry} />)}
        {inquiries.length === 0 && <p className="px-6 py-14 text-center font-editorial text-lg text-stone">No enquiries yet.</p>}
      </section>
    </div>
  );
}
