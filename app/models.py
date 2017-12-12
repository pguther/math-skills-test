from app import db


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)
    score = db.Column(db.Integer, index=True, unique=False)

    def __repr__(self):
        return '<Score %r %r>' % (self.name, self.score)