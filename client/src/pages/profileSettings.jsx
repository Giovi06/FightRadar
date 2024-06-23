import ProfileSettings from "../components/profile";
import Header from "../components/header";

export default function SignupPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="update your account settings"
            paragraph="Already done? "
            linkName="Home"
            linkUrl="/home"
          />
          <ProfileSettings />
        </div>
      </div>
    </>
  );
}
