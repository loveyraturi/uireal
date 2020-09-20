import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PropertiesService {

  constructor(private http: HttpClient) { }
  addProperties(ruleConf): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/addProperties', ruleConf).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  updatePropertyAvailability(request): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/updatePropertyAvailability', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  matchRequirements(ruleConf): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/matchRequirements', ruleConf).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  updateImages(ruleConf): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/updateImages', ruleConf).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  updateProperty(ruleConf): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/updateProperty', ruleConf).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  scheduleAppointment(ruleConf): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/scheduleAppointment', ruleConf).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  fetchPropertiesById(id): Observable<any> {
    return this.http
      .get('https://ownertenants/realestate/realestate/fetchPropertiesById/' + id).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  sortlistedProperties(username): Observable<any> {
    return this.http
      .get('https://ownertenants/realestate/realestate/sortlistedProperties/' + username).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  deleteInterestedProperties(propertyId,username): Observable<any> {
    return this.http
      .get('https://ownertenants/realestate/realestate/deleteInterestedProperties/'+propertyId+'/' + username).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  manageProperties(request): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/manageProperties', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  findPropertiesNearMe(request): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/findPropertiesNearMe', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  updatePropertyStatus(propertyId, status): Observable<any> {
    return this.http
      .get('https://ownertenants/realestate/realestate/updatePropertyStatus/' + propertyId + '/' + status).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  fetchProperties(): Observable<any> {
    return this.http
      .get('https://ownertenants/realestate/realestate/fetchProperties/').pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  fetchUnapprovedProperties(): Observable<any> {
    return this.http
      .get('https://ownertenants/realestate/realestate/fetchUnapprovedProperties/').pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  mainSearch(request): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/mainProperties', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  fetchreportdatabetweenpropertyadded(request): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/fetchreportdatabetweenpropertyadded', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  searchProperties(request): Observable<any> {
    return this.http
      .post('https://ownertenants/realestate/realestate/searchProperties', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  searchAddress(address): Observable<any> {
    return this.http
      .get('https://ownertenants/realestate/realestate/searchAddress/' + address).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
}