import { Skeleton } from "primereact/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="product-card">
      <Skeleton width="100%" height="180px" />
      <Skeleton width="80%" height="20px" style={{ marginTop: 15 }} />
      <Skeleton width="40%" height="18px" style={{ marginTop: 10 }} />
      <Skeleton width="100%" height="40px" style={{ marginTop: 20 }} />
    </div>
  );
}