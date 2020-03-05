import React from 'react';
import './NavBar.css';
import { Repo } from '../../types/repo'

function NavBar(props: { repo: Repo }) {
    const { repo } = props;

    return (
        <header className="NavBar">
            {repo.name} - {repo.watchers_count}
        </header>
    )
}

export default NavBar;