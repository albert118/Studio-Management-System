import { Accordion, AccordionItem} from "carbon-components-react";

function ProjectAccordian (){
	return (
		<Accordion className="accordian">
			<AccordionItem title="Section 1 title">
				<div className='accordion-content'>
					<div className='accordion-description'>
						<h2>Description</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
							veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
							commodo consequat.
						</p>
					</div>
					<div className='accordion-groups'>
						<h2>Groups</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
							veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
							commodo consequat.
						</p>
					</div>
				</div>
			</AccordionItem>
		</Accordion>
	);
}

export default ProjectAccordian;