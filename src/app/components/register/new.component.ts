import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterRenderPhase,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  afterNextRender,
  afterRender,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BaseComponent } from '@components/base/base.component';
import { AuthService } from '@services/auth.service';
import { ReversePipe } from 'app/pipe/reverse-pipe.pipe';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-newcomponent',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    ReversePipe,
    DatePipe,
    BaseComponent,
  ],
  templateUrl: './new.component.html',
  styleUrl: './register.component.scss',
})
export class NewComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterContentChecked
{
  @ViewChild('Template', { static: false }) Template!: ElementRef;
  @ViewChild('content', { static: false }) content!: ElementRef;

  mySubject = new Subject<number>();
  myBehaviourSubject = new BehaviorSubject(0);
  color: string = '';
  test: string = '';
  date: number = Date.now();
  isShow: boolean = true;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    afterRender(() => {
      const elem = this.content.nativeElement.innerHTML;
      console.log(`afterRender==>content: (${elem})`);
    });
    afterNextRender(() => {
      const elem = this.content.nativeElement.innerHTML;
      console.log(`afterNextRender==>content: (${elem})`);
    });
  }

  ngOnInit() {
    this.test = 'ABCdef';

    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      aliases: this.fb.array([this.fb.control('')]),
    });

    // Subject
    this.mySubject.subscribe((value) => {
      console.log(`1 Received: ${value}`);
    });
    this.mySubject.next(10);

    this.mySubject.subscribe((value) => {
      console.log(`2 Received: ${value}`);
    });

    this.mySubject.next(30);
    this.mySubject.next(20);

    // BehaviourSubject
    this.myBehaviourSubject.subscribe((value) => {
      console.log(`A Received: ${value}`);
    });
    this.myBehaviourSubject.next(100);
    this.myBehaviourSubject.next(50);

    this.myBehaviourSubject.subscribe((value) => {
      console.log(`B Received: ${value}`);
    });
    this.myBehaviourSubject.next(10);

    // console.log('ParentComponent==>ngOnInit works');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
  }

  ngDoCheck() {
    console.log('ParentComponent==>ngDoCheck works');
  }

  ngAfterViewInit() {
    console.log('ParentComponent==>ngAfterViewInit');
    console.log(this.Template);
  }

  ngAfterViewChecked() {
    console.log('ParentComponent==>ngAfterViewChecked');
  }

  ngAfterContentInit() {
    console.log('ParentComponent==>ngAfterContentInit');
    console.log(this.Template);
  }

  ngAfterContentChecked() {
    console.log('ParentComponent==>ngAfterContentChecked');
  }

  ngOnDestroy() {
    console.log('ParentComponent==>ngOnDestroy works');
  }

  formStyle = {
    'font-style': 'italic',
  };

  get aliases() {
    return this.form.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.router.navigate(['/login']);
  }
  OnTrigger() {
    console.log('Event triggered');
  }
  getBioComponent() {
    return BaseComponent;
  }
}
