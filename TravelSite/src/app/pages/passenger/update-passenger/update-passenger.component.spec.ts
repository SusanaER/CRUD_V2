<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="container home-form">
            <div class="row">
                <div class="col-md-12 col-md-offset-4">
                    <div class="panel panel-default">
                        <div class="panel-body bg-dark">
                            <div class="text-center">
                                <h1>Upadate Journey</h1>
                                <form [formGroup]="updateForm" autocomplete="off" class="form space" (ngSubmit)="update()">
                                    <div class="input-field col s12">
                                        <label>Origin:</label>
                                        <select [(ngModel)]="originSelected" [ngModelOptions]="{standalone: true}" class="button-size">
                                          <option *ngFor="let d of destination" [value]="d.id">
                                            {{d.name}}
                                         </option>
                                        </select>
                                    </div>

                                    <div class="input-field col s12">
                                        <label>Destination:</label>
                                        <select [(ngModel)]="destinationSelected" [ngModelOptions]="{standalone: true}" class="button-size">
                                            <option *ngFor="let d of destination" [value]="d.id">
                                              {{d.name}}
                                           </option>
                                        </select>
                                    </div>
                                    <p>
                                        <label for="departure">Departure:</label>
                                        <input type="datetime-local" formControlName="departure" id="departure" class="button-size" />
                                    </p>
                                    <p>
                                        <label for="arrival">Arrival:</label>
                                        <input type="datetime-local" formControlName="arrival" id="arrival" class="button-size" />
                                    </p>
                                    <div class="form-group space">
                                        <button type="submit" class="btn btn-warning button-size">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <footer class="bg-dark text-center text-lg-start">
        <!-- Copyright -->
        <div class="text-center p-3">
          ?? 2022 Copyright
        </div>
        <!-- Copyright -->
      </footer>
</html>