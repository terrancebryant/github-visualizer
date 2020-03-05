import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';

import NavBar from './components/NavBar/NavBar';
import IssueList from './components/IssueList/IssueList';


interface Org {
    name: string,
    location: string,
    repos_url: string,
}

interface Repo {
    name: string,
    watchers_count: number,
}

interface Issues {
    title: string,
    number: string,
    id: number,
    body: string,
    created_at: string,
    user: {
        login: string
    },
}

interface Issue {
    id: string,
    comments_url: string,
    title: string
}

function App() {
    const [org, setOrg] = useState<Org>({
        name: "",
        location: "",
        repos_url: "",
    })

    const [reactRepo, setReactRepo] = useState<Repo>({
        name: '',
        watchers_count: 0,
    });

    const [issues, setIssues] = useState<Issues[]>([]);

    const [issue, setIssue] = useState<Issue>({
        id: '',
        comments_url: '',
        title: '',
    });

    const [url] = useState('https://api.github.com/orgs/facebook');

    const getRepoData = useCallback((): void => {
        const fetchData = async (): Promise<void> => {
            let response = await axios.get('https://api.github.com/repos/facebook/react');
            await setReactRepo(response.data);
            await getIssueData();
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            let response = await axios(url);
            setOrg(response.data);
            await getRepoData();
        };
        // fetchData();
    }, [url, getRepoData]);


    async function getIssueData(): Promise<void> {
        let response = await axios.get('https://api.github.com/repos/facebook/react/issues', {
            params: {
                state: 'open'
            }
        });
        setIssues(response.data)
    }

    async function issueLink(id:number | string) {
        let response = await axios.get(`https://api.github.com/repos/facebook/react/issues/${id}`)
        setIssue(response.data);
        await issueComments(response.data.comments_url)
    }

    async function issueComments(comments_url: string): Promise<void> {
        let response = await axios.get(comments_url);
        console.log(response);
    }

    function clearData(): void {
        setOrg({
            name: '',
            location: '',
            repos_url: "",
        });
    }

    return (
        <div className="App">
            <NavBar repo={reactRepo} />

            <IssueList list={issues}/>


            {/* <button onClick={clearData}>Clear Data</button> */}

            <div className="orgData">
                {org.name ? <div>{org.name} - {org.location}</div> : <div>No Data</div>}
                <div>Repo: {reactRepo.name}</div> has {reactRepo.watchers_count} watchers;
            </div>

            <div className="container">
                <IssueList list={issues} />

                {issue.id !== '' ? (
                    <div className="issue-content">
                        <section className={`issue-${issue.id} issue`}>
                            <h1 className="issue-header">{issue.title}</h1>
                            {/* <div className="issue-body">{`#${item.number} opened ${moment(item.created_at).fromNow()} by ${item.user.login}`}</div> */}
                        </section>
                    </div>
                    ) : (
                        <div>Please Select an issue.</div>
                    )
                }
            </div>
        </div>
    )

}

export default App;