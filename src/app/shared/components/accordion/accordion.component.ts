import { Component, Input } from '@angular/core';
import { DocumentStep } from '@models/document.model';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() stepTitle = '';
  @Input() stepNumber = 1;
  @Input() stepDescription = '';
  documentSteps = DocumentStep;
  showAccordionBody = false;
  image: any;

  accordionAction() {
    // this.image = document.getElementById('arrow');
    // this.showAccordionBody
    //   ? this.image.setAttribute('class', 'image')
    //   : this.image.setAttribute('class', 'rotated-image');

    this.showAccordionBody = !this.showAccordionBody;
  }
}
