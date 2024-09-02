import { signOut } from "@/auth";

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  p-6">
      <div className=" shadow-lg bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h5 className="text-xl font-semibold text-gray-700 mb-4">
          Are you sure you want to sign out?
        </h5>
        <form
          action={async (formData) => {
            "use server";
            await signOut();
          }}
          className="flex flex-col space-y-4"
        >
          <button
            type="submit"
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-300"
          >
            Yes, Sign Out
          </button>
          <a
            href="/dashboard"
            className="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-300"
          >
            Cancel
          </a>
        </form>
      </div>
    </div>
  );
}
