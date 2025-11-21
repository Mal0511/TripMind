export default function PlanTimelineItem({ item }) {

  const getTypeStyles = (type) => {
    switch (type) {
      case "flight": return { icon: "fas fa-plane", color: "bg-blue-100 text-blue-600" };
      case "hotel": return { icon: "fas fa-bed", color: "bg-indigo-100 text-indigo-600" };
      case "food": return { icon: "fas fa-utensils", color: "bg-orange-100 text-orange-600" };
      case "transport": return { icon: "fas fa-taxi", color: "bg-yellow-100 text-yellow-600" };
      default: return { icon: "fas fa-camera", color: "bg-green-100 text-green-600" };
    }
  };

  const style = getTypeStyles(item.type);

  return (
    <div className="relative pl-8 group">
      {/* Chấm tròn trên timeline */}
      <div className={`absolute left-[11px] top-0 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${item.type === 'flight' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
      
      {/* Nội dung thẻ */}
      <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-blue-300 transition flex gap-4 hover:shadow-md">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${style.color}`}>
          <i className={`${style.icon}`}></i>
        </div>
        
        {/* Text */}
        <div>
          <h3 className="font-bold text-gray-800">{item.title}</h3>
          <p className="text-sm font-medium text-blue-600">
            {item.time} {item.endTime && `- ${item.endTime}`}
          </p>
          {item.note && (
            <p className="text-xs text-gray-500 mt-1 bg-gray-50 p-1 px-2 rounded inline-block">
              <i className="fas fa-info-circle mr-1"></i>{item.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}