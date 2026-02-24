from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///project.db"
db.init_app(app)

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    #password: Mapped[str] = mapped_column(unique=True)

class Post(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)
    contents: Mapped[str] = mapped_column(unique=True)

with app.app_context():
    db.create_all()

######################################

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/users")
def users_list():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()
    return render_template("users/list.html", users=users)

@app.route("/users/create", methods=["GET", "POST"])
def user_create():
    if request.method == "POST":
        user = User(
            title=request.form["username"],                      # type: ignore
            # password=request.form["password"],                      # type: ignore
        )
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("user_detail", id=user.id))

    return render_template("users/create.html")

@app.route("/user/<int:id>")
def user_detail(id):
    user = db.get_or_404(User, id)
    return render_template("users/detail.html", user=user)

@app.route("/user/<int:id>/delete", methods=["GET", "POST"])
def user_delete(id):
    user = db.get_or_404(User, id)

    if request.method == "POST":
        db.session.delete(user)
        db.session.commit()
        return redirect(url_for("users_list"))

    return render_template("users/delete.html", user=user)

@app.route("/posts")
def posts_list():
    posts = db.session.execute(db.select(Post).order_by(Post.title)).scalars()
    return render_template("posts/list.html", posts=posts)

@app.route("/posts/create", methods=["GET", "POST"])
def post_create():
    if request.method == "POST":
        post = Post(
            title=request.form["title"],                      # type: ignore
            contents=request.form["contents"],                # type: ignore
        )
        db.session.add(post)
        db.session.commit()
        return redirect(url_for("post_detail", id=post.id))

    return render_template("posts/create.html")

@app.route("/post/<int:id>")
def post_detail(id):
    post = db.get_or_404(Post, id)
    return render_template("posts/detail.html", post=post)

@app.route("/post/<int:id>/delete", methods=["GET", "POST"])
def post_delete(id):
    post = db.get_or_404(Post, id)

    if request.method == "POST":
        db.session.delete(post)
        db.session.commit()
        return redirect(url_for("posts_list"))

    return render_template("posts/delete.html", post=post)

######################################

if __name__ == '__main__':
    app.run(debug=True)