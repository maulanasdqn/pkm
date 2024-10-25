import * as React from 'react';

export type ProgramCardProps = {
  title: string;
  description: string;
};
export const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
}): React.ReactElement => {
  return (
    <div className="flex flex-col space-y-2 gap-6 p-3 md:p-5 relative overflow-hidden shadow rounded bg-white">
      <div className="rounded bg-primary-60% w-[500px] h-36 -rotate-3 absolute -top-20 -left-7" />
      <h1 className="text-base sm:text-lg md:text-xl text-white text-center w-full font-semibold z-20">
        {title}
      </h1>
      <p className="text-primary text-sm md:text-base z-20">{description}</p>
    </div>
  );
};
