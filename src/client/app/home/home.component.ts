import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
    this.testRecursion();
  }

  testRecursion() {

    let stack: number[] = [];
    let hanoi = (disc: number, src: string, aux: string, dst: string) => {

      if(disc > 0) {
        // console.log(`before recursion, disc : ${disc}`);
        hanoi(disc - 1, src, dst, aux);// Put the disc to aux first
        console.info(`===== Move Disc ${disc} from ${src} to ${dst} ======`);
        hanoi(disc - 1, aux, src, dst);
        // console.info(`Stopped disc value: ${disc}`);
      }
      // console.log(`after recursion, disc : ${disc}`);
      stack.push(disc);
    };

    let testRecur = (foo: number = 4) => {
      if(foo > 0) {
        console.info(`${foo}`);
        testRecur(foo - 1);
        console.info(`After call : ${foo}`);
      }
    };

    hanoi(3, 'source', 'aux', 'dest');
    // testRecur(3);
    console.info(stack);
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
