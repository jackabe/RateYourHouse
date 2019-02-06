import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <div>
        <p onClick={firebase.doSignOut}>
            Logout
        </p>
    </div>

);

export default withFirebase(SignOutButton);
