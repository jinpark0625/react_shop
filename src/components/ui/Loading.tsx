import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
  return (
    <div className="fixed z-50">
      <div className="fixed inset-0 bg-gray-500/20 transition-opacity">
        <div className="flex h-screen items-center justify-center">
          <CgSpinner className="animate-spin text-3xl text-indigo-600" />
        </div>
      </div>
    </div>
  );
}
