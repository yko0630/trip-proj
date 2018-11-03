import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { TripsService } from "../../services/trips.service";
import { ExpenseService } from "../../services/expense.service";
import { MemberService } from "../../services/member.service";
import { Trip } from "../../models/trip";
import { Member } from "src/app/models/member";
import { Expense } from "src/app/models/expense";

@Component({
  selector: "app-trip-details",
  templateUrl: "./trip-details.component.html",
  styleUrls: ["./trip-details.component.css"]
})
export class TripDetailsComponent implements OnInit {
  @Input()
  currentTrip: Trip;
  isAddingExpense: boolean;
  isAddingMember: boolean;

  constructor(
    private tripService: TripsService,
    private memberService: MemberService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.isAddingExpense = false;
    this.isAddingMember = false;
  }

  addExpense() {
    console.log("Adding expense");
    this.isAddingExpense = true;
    let newExpense: Expense = new Expense(null, null, null, null);
    this.expenseService.addExpense(newExpense);
  }

  removeExpense() {
    console.log("Removing expense");
  }

  addMember() {
    console.log("Adding member");
    this.isAddingMember = true;
    let newMember: Member = new Member(null);
    this.memberService.addMember(newMember);
  }

  removeMember() {
    console.log("Removing member");
  }

  deleteTrip() {
    this.tripService.deleteTrip(this.currentTrip).subscribe(
      trip => {
        console.log("Deletion successful");
      },
      error => {
        console.log(error);
        alert("Something went wrong.");
      }
    );
  }
}
