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
      .post('http://localhost:6001/realestate/addProperties', ruleConf).pipe(
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
      .post('http://localhost:6001/realestate/updatePropertyAvailability', request).pipe(
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
      .post('http://localhost:6001/realestate/matchRequirements', ruleConf).pipe(
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
      .post('http://localhost:6001/realestate/updateImages', ruleConf).pipe(
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
      .post('http://localhost:6001/realestate/updateProperty', ruleConf).pipe(
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
      .post('http://localhost:6001/realestate/scheduleAppointment', ruleConf).pipe(
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
      .get('http://localhost:6001/realestate/fetchPropertiesById/' + id).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  sortlistedProperties(request): Observable<any> {
    return this.http
      .post('http://localhost:6001/realestate/sortlistedProperties/', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  deleteInterestedProperties(request): Observable<any> {
    return this.http
      .post('http://localhost:6001/realestate/deleteInterestedProperties/',request).pipe(
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
      .post('http://localhost:6001/realestate/manageProperties', request).pipe(
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
      .post('http://localhost:6001/realestate/findPropertiesNearMe', request).pipe(
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
      .get('http://localhost:6001/realestate/updatePropertyStatus/' + propertyId + '/' + status).pipe(
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
      .get('http://localhost:6001/realestate/fetchProperties/').pipe(
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
      .get('http://localhost:6001/realestate/fetchUnapprovedProperties/').pipe(
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
      .post('http://localhost:6001/realestate/mainProperties', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  filter(request): Observable<any> {
    return this.http
      .post('http://localhost:6001/realestate/filter', request).pipe(
        map(
          res => {
            return res;
          },
          err => {
            return err;
          }
        ))
  }
  fetchreportdatabetweenmatchingProperties(request): Observable<any> {
    return this.http
      .post('http://localhost:6001/realestate/fetchreportdatabetweenmatchingProperties', request).pipe(
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
      .post('http://localhost:6001/realestate/fetchreportdatabetweenpropertyadded', request).pipe(
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
      .post('http://localhost:6001/realestate/searchProperties', request).pipe(
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
      .get('http://localhost:6001/realestate/searchAddress/' + address).pipe(
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