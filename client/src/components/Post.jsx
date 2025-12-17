import React from "react";

const Post = () => {
  return (
    <div className="flex gap-6 py-6 border-b border-gray-200 min-h-[160px] w-full">
      
      {/* IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=600"
        alt="post"
        className="w-80 h-48 object-cover rounded-md flex-shrink-0"
      />

      {/* CONTENT */}
      <div className="flex flex-col gap-2">
        
        <h2 className="text-2xl font-bold leading-snug">
          Full-house battery backup coming later this year
        </h2>

        <span className="text-lg text-gray-500 font-semibold">
          David Pasko · Oct 16, 2023
        </span>

        <p className="text-sm text-gray-700 leading-relaxed">
          EcoFlow announced several new power products during its latest launch
          event, including a comprehensive whole-home battery backup solution
          designed for modern households. The system aims to provide uninterrupted
          power during outages, improve energy efficiency, and integrate seamlessly
          with existing solar setups for long-term sustainability and cost savings.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, veritatis itaque ipsum ipsa laboriosam asperiores.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis quidem repellendus repudiandae ut minus doloribus quis delectus porro reprehenderit quisquam!
        </p>

      </div>
    </div>
  );
};

export default Post;
