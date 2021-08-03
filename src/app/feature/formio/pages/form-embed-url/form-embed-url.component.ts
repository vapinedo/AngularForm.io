import { Formio } from 'formiojs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-embed-url',
  templateUrl: './form-embed-url.component.html',
  styleUrls: ['./form-embed-url.component.scss']
})
export class FormEmbedUrlComponent implements OnInit {

  private readonly formUrlSource = 'https://examples.form.io/example';

  constructor() {}

  ngOnInit(): void {
    const DOMElement = document.getElementById('embed-url');
    Formio.createForm(DOMElement, this.formUrlSource);
  }

}