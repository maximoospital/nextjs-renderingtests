import ToastViewport from "@/components/toast";

export default function CachingLayout({ children }) {
  return (
    <>
      {children}
      <ToastViewport />
    </>
  );
}
