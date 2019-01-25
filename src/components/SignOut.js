import React from 'react';

import { withFirebase } from './Firebase';

const SignOutButton = ({ firebase }) => (
    <p onClick={firebase.doSignOut}>
        Logout
    </p>
);

export default withFirebase(SignOutButton);
