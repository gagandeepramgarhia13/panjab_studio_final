export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <h2 className="text-xl font-bold p-4 border-b">Admin Panel</h2>

        <ul className="p-4 space-y-3">
          <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-500 cursor-pointer">Users</li>
          <li className="hover:text-blue-500 cursor-pointer">Orders</li>
          <li className="hover:text-blue-500 cursor-pointer">Settings</li>
        </ul>
      </div>
    </>
  );
}