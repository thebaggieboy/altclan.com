import React from 'react'

export default function component() {
  return (
    <div>
        
				<div class="grid gap-4 p-5">
					<div>
						<img class="h-auto max-w-full rounded-lg text-center" src={merch.display_image} alt="" />
					</div>
					<div class="grid grid-cols-5 gap-4">
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
					</div>
				</div>
    </div>
  )
}
