export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-50">
      <div className="flex flex-col items-start justify-between max-w-6xl gap-8 px-6 py-10 mx-auto md:flex-row md:items-center">
        
        {/* Logo & Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold text-gray-800">
            TRIP MIND✈
          </h1>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt"></i> <span>Address :</span>
            </p>
            <p className="flex items-center space-x-2">
              <i className="fas fa-phone"></i> <span>Phone :</span>
            </p>
            <p className="flex items-center space-x-2">
              <i className="fas fa-envelope"></i> <span>Email :</span>
            </p>
          </div>        
        </div>

        {/* Social */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Connect with us :</h3>
          <div className="flex space-x-5 text-xl text-gray-600">
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fas fa-phone-alt"></i></a>
            <a href="#"><i className="fab fa-facebook-messenger"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
