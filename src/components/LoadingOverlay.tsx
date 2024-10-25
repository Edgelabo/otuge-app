export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="cloud-animation"></div>
    </div>
  );
}