import { Suspense } from "react";
import BrowseProfileContent from "../../components/BrowseProfileContent";

export default function BrowseProfilePage() {
  return (
    <Suspense
      fallback={<p className="text-center mt-10">Loading profiles...</p>}
    >
      <BrowseProfileContent />
    </Suspense>
  );
}
