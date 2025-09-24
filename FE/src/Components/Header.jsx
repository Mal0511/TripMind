export default function HeaderTop() {
  return (
    <div className="flex items-center justify-between px-10 py-1 text-xs text-gray-600 bg-gray-50">
      <span>Questions? Need Help?</span>

      <div className="flex items-center space-x-6">
        <span className="flex items-center space-x-1 transition cursor-pointer hover:text-blue-600">
          <i className="fas fa-gift"></i>
          <span>TM Gift Card</span>
        </span>
        <span className="flex items-center space-x-1 transition cursor-pointer hover:text-blue-600">
          <i className="far fa-star"></i>
          <span>Loyalty Program</span>
        </span>
      </div>
    </div>
  );
}
