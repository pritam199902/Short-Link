// import {Router, Switch, Link} from 'react-router-dom'

function Nav() {
  return (
    <nav
      className="navbar navbar-light bg-light justify-content-center shadow fixed-top"
      style={styles.navbar}
    >
      <div className="container justify-content-center ">
        <a
          className="navbar-brand text-center justify-content-center"
          style={{ color: "#faa", fontSize: 26 }}
          href="/"
        >
          <h3 style={{ fontSize: 30, fontWeight: "bolder", color: '#686' }}>
            Short
            <img
              src="logo1.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />Link
          </h3>
        </a>
      </div>
    </nav>
  );
}



const styles = {
    navbar :{
        // backgroundColor : '#444',
    },
}

export default Nav;
