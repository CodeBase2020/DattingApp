import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Members } from 'src/app/models/Members';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

   userName : string;
   memberDetails: Members;
   galleryOptions: NgxGalleryOptions[];
   galleryImages: NgxGalleryImage[];
  imageUrl:any[] = [];
  constructor(private _service: MemberService,private _route: ActivatedRoute) { }

  ngOnInit(): void {

     this.getUserName();

     this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    
  }

  getGalleryImages() : NgxGalleryImage[] {

    for(const photo of this.memberDetails.photos)
    {    
         this.imageUrl.push({
           small: photo?.url,
           medium: photo?.url,
           big: photo?.url
         });
    }

    return this.imageUrl;

  }

  getUserName()
  {
    this.userName = this._route.snapshot.paramMap.get('userName');
   this._service.getMember(this.userName).subscribe(res => {
   this.memberDetails = res;
    this.galleryImages = this.getGalleryImages(); 
    // this.galleryImages = [
    //   {
    //     small: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    //     medium: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    //     big: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    //   },
    //   {
    //     small: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    //     medium: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    //     big: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    //   },
    //   {
    //     small: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    //     medium: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    //     big: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    //   },{
    //     small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //     medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //     big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    //   },      
    // ];
   })
    
  }

}
