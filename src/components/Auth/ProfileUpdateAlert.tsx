import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import ErrorMessage from 'components/ui/ErrorMessage';

interface ProfileUpdateProps {
  updated: boolean;
  updateError: boolean;
}

const ProfileUpdateAlert = ({ updated, updateError }: ProfileUpdateProps) => {
  return (
    <>
      {updated && (
        <div className="mb-6 flex rounded-lg border border-green-500 bg-green-50 p-4 text-sm font-medium text-green-500">
          <CheckCircleIcon className="mr-2 inline-block h-5 w-5" />
          Your profile data has been successfully updated.
        </div>
      )}
      {updateError && (
        <div className="mb-6 flex rounded-lg border border-red-500 bg-red-50 p-4 text-sm font-medium text-red-500">
          <ExclamationCircleIcon className="mr-2 inline-block h-5 w-5" />
          <ErrorMessage />
        </div>
      )}
    </>
  );
};

export default ProfileUpdateAlert;
