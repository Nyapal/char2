const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Charity = require('../models/charity');

chai.use(chaiHttp);

const sampleCharity = {
    'org': 'SF Childrens Hospital'
}

describe('Charities', ()  => {
    after(() => {
    Charity.deleteMany({org: 'SF Childrens Hospital'}).exec((err, charities) => {
      console.log(charities)
      charities.remove();
    })
  });

  // TEST INDEX
  it('should index ALL charities on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /charities/new GET', (done) => {
    chai.request(server)
      .get(`/charities/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST CREATE
  it('should create a SINGLE charity on /charities POST', (done) => {
      chai.request(server)
          .post('/charities')
          .send(sampleCharity)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
          });
    });

  // TEST SHOW
  it('should show a SINGLE charity on /charities/<id> GET', (done) => {
    const charity = new Charity(sampleCharity);
    charity.save((err, data) => {
      chai.request(server)
        .get(`/charities/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });

  // TEST EDIT
  it('should edit a SINGLE charity on /charities/<id>/edit GET', (done) => {
    const charity = new Charity(sampleCharity);
     charity.save((err, data) => {
       chai.request(server)
         .get(`/charities/${data._id}/edit`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });
 });

  // TEST UPDATE
  it('should update a SINGLE charity on /charities/<id> PUT', (done) => {
    const charity = new Charity(sampleCharity);
    charity.save((err, data)  => {
     chai.request(server)
      .put(`/charities/${data._id}?_method=PUT`)
      .send({'org': 'Updating the name'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  // TEST DELETE
  it('should delete a SINGLE charity on /charities/<id> DELETE', (done) => {
    const charity = new Charity(sampleCharity);
    charity.save((err, data)  => {
     chai.request(server)
      .delete(`/charities/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
});
