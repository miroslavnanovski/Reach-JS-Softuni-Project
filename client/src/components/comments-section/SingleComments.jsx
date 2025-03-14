import dateFormat from "../../utils/dateFormat"


export default function SingleComment({comment}){

  const date = dateFormat(comment.createdAt);
    
    return (
        <div className="w-full flex-col justify-start items-start gap-8 flex">
            <div className="w-full pb-6 border-b border-gray-300 justify-start items-start gap-2.5 inline-flex">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://pagedone.io/asset/uploads/1710226776.png"
                alt="Mia Thompson image"
              />
              <div className="w-full flex-col justify-start items-start gap-3.5 inline-flex">
                <div className="w-full justify-start items-start flex-col flex gap-1">
                  <div className="w-full justify-between items-start gap-1 inline-flex">
                    <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                      {comment.user}
                    </h5>
                    <span className="text-right text-gray-500 text-xs font-normal leading-5">
                      {date}
                    </span>
                  </div>
                  <h5 className="text-gray-800 text-sm font-normal leading-snug">
                    {comment.text}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        
    )
}