import React from 'react';


export async function getServerSideProps(context) {
    const id = context.params.id
    const res = await fetch(`https://altclan-brands-api-1-1.onrender.com/api/communities/${id}`)
    //const res = await fetch(`http://127.0.0.1:8000/api/brand_profile/${id}`);
    const data = await res.json()
    console.log(data)
  
    return {
      props: {brand:data}
    }
  
  }
  
const Id = () => {
    return (
        <div>
            <section>
                <div className="text-center">
                    <button style={{float:'right'}} className="bg-black text-white">
                        Make a post
                    </button>
                </div>
                <h2 className='text-black font-semibold'>Community Name</h2>
                <p>Community Bio</p>
            </section>
            
        </div>
    );
}

export default Id;
