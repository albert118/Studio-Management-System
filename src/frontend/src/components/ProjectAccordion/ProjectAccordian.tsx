import React, { useState, useEffect } from "react";
import { AccordionItem } from "carbon-components-react";
import ProjectGroups from "../ProjectGroups/ProjectGroups";

function ProjectAccordian (){
	const [data, setData] = useState([]);

	useEffect(() => {
	fetch("https://example.com/api/data")
		.then((response) => response.json())
		.then((json) => setData(json));
	}, []);

	return (
	  	<div>
			{data.map((item) => (
				<AccordionItem title={item.title}>
					<div className='accordion-content'>
						<div className='accordion-description'>
							<h2>Description</h2>
							<p>{item.title}</p>
						</div>
						<div className='accordion-groups'>
							<h2>Groups</h2>
							<div className="project-groups">
								<ProjectGroups/>
							</div>
						</div>
					</div>
				</AccordionItem>
			))}
		</div>
	);
}

export default ProjectAccordian;