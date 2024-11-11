import { lazy, Suspense } from "react";
import Spinner from "@/components/Spinner";

const getLazyComponent = (nameComponent: string) => {
  const LazyComponent = lazy(() => import(`../pages/${nameComponent}`));

  return (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  );
};

export default getLazyComponent;
