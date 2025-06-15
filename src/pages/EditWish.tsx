
import { useParams } from "react-router-dom";
import EditWishForm from "@/components/wishes/EditWishForm";

export default function EditWishPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div className="text-center text-lg mt-10">No wish ID provided</div>;
  }
  return (
    <div className="min-h-screen bg-background">
      <EditWishForm wishId={id} />
    </div>
  );
}
