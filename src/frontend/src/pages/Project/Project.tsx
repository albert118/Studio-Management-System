import { Accordion } from "carbon-components-react";
import ProjectAccordian from "components/ProjectAccordion/ProjectAccordian";

function Project() {
	return (
		<section className='projects-content'>
			<h1>Projects</h1>
			<Accordion className="accordian">
				<ProjectAccordian/>
			</Accordion>
		</section>
	);
}

export default Project;
