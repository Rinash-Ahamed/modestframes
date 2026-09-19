import { getInquiries } from "@/lib/db";
import { InquiryRow } from "@/components/InquiryRow";

export default function AdminInquiriesPage() {
  const inquiries = getInquiries();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-black tracking-tight text-bone">Enquiries</h1>
        <p className="font-editorial mt-1 text-lg text-stone">Messages submitted through the public contact form.</p>
      </div>

      <div className="divide-y divide-bone/10 border-y border-bone/10">
        {inquiries.map((i) => (
          <InquiryRow key={i.id} inquiry={i} />
        ))}
        {inquiries.length === 0 && <p className="font-editorial py-10 text-center text-lg text-stone">No enquiries yet.</p>}
      </div>
    </div>
  );
}
