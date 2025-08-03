import SignInButton from "../_components/SignInButton";

export default function LoginPage() {
  return (
      <div className="grid min-h-[400px]">
        <div className="flex flex-col items-center justify-center text-primary-300 px-8 py-12">
          <h1 className="text-xl md:text-3xl mb-8">Login to your account to access the guest area.</h1>
            <SignInButton />
        </div>
      </div>
  );
}
