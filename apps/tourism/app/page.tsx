// eslint-disable-next-line @nx/enforce-module-boundaries
import { Button } from '../../../components/ui/src/button/button';
const Page = () => {
  return (
    <section className="bg-neutral-300 text-neutral h-screen flex flex-col justify-center items-center gap-5 px-5">
      <div className="bg-green text-primary">Waduh</div>
      <div className="flex flex-col items-center w-full h-fit gap-2">
        <div className="space-x-2">
          <Button variant="primary" size="sm">
            bang
          </Button>
          <Button variant="primary" size="md">
            bang
          </Button>
          <Button variant="primary" size="lg" useIconArrowDown="right" disabled>
            bang
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="primary" size="sm" variantType="secondary">
            bang
          </Button>
          <Button variant="primary" size="md" variantType="secondary">
            bang
          </Button>
          <Button
            variant="primary"
            size="lg"
            variantType="secondary"
            useIconArrowDown="right"
            disabled
          >
            bang
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="primary" size="sm" variantType="text-only">
            bang
          </Button>
          <Button variant="primary" size="md" variantType="text-only">
            bang
          </Button>
          <Button
            variant="primary"
            size="lg"
            variantType="text-only"
            useIconArrowDown="right"
            disabled
          >
            bang
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-fit gap-2">
        <div className="space-x-2">
          <Button variant="secondary" size="sm">
            bang
          </Button>
          <Button variant="secondary" size="md">
            bang
          </Button>
          <Button
            variant="secondary"
            size="lg"
            useIconArrowDown="right"
            disabled
          >
            bang
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="secondary" size="sm" variantType="secondary">
            bang
          </Button>
          <Button variant="secondary" size="md" variantType="secondary">
            bang
          </Button>
          <Button
            variant="secondary"
            size="lg"
            variantType="secondary"
            useIconArrowDown="right"
            disabled
          >
            bang
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="secondary" size="sm" variantType="text-only">
            bang
          </Button>
          <Button variant="secondary" size="md" variantType="text-only">
            bang
          </Button>
          <Button
            variant="secondary"
            size="lg"
            variantType="text-only"
            useIconArrowDown="right"
            disabled
          >
            bang
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-fit gap-2">
        <div className="space-x-2">
          <Button variant="error" size="sm">
            bang
          </Button>
          <Button variant="error" size="md">
            bang
          </Button>
          <Button variant="error" size="lg" useIconArrowDown="right" disabled>
            bang
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="error" size="sm" variantType="secondary">
            bang
          </Button>
          <Button variant="error" size="md" variantType="secondary">
            bang
          </Button>
          <Button
            variant="error"
            size="lg"
            variantType="secondary"
            useIconArrowDown="right"
            disabled
          >
            bang
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="error" size="sm" variantType="text-only">
            bang
          </Button>
          <Button variant="error" size="md" variantType="text-only">
            bang
          </Button>
          <Button
            variant="error"
            size="lg"
            variantType="text-only"
            useIconArrowDown="right"
            disabled
          >
            bang
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
