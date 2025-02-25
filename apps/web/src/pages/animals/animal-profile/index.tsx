function AnimalProfile() {
  return (
    <div className="w-[95%] mx-auto bg-gray-100 rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 font-weight-700">About Animal</h2>
      <div className="flex justify-between space-x-4">
        <div className="w-1/2 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold">Category</label>
            <input 
              type="text" 
              placeholder="CategoryXYZ" 
              className="border rounded px-3 py-2 bg-gray-50"
              
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold">Weight</label>
            <input 
              type="text" 
              placeholder="50Kgs" 
              className="border rounded px-3 py-2 bg-gray-50"

            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold">Age</label>
            <input 
              type="text" 
              placeholder="Infant" 
              className="border rounded px-3 py-2 bg-gray-50"

            />
          </div>
        </div>
        <div className="w-1/2 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold">Animal</label>
            <input 
              type="text" 
              placeholder="AnimalXYZ" 
              className="border rounded px-3 py-2 bg-gray-50"

            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold">Breed</label>
            <input 
              type="text" 
              placeholder="BreedXYZ" 
              className="border rounded px-3 py-2 bg-gray-50"

            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalProfile;