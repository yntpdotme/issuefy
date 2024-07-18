import Link from 'next/link';
import {FaGithub} from 'react-icons/fa';

const SourceCode = ({link}: {link: string}) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 flex items-center justify-center hover:drop-shadow-[-0.2rem_0_1rem_#f0f0f0] dark:text-white"
    >
      <FaGithub className="size-[30px]" />
      <span className="absolute inline-flex size-[22px] animate-ping rounded-full bg-black opacity-25 delay-150 dark:bg-white"></span>
    </Link>
  );
};

export default SourceCode;
