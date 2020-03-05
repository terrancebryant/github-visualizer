import React from 'react';
import moment from 'moment';
import { Issues } from '../../types/issue'

function IssueList(issues: any) {
    return (
        <div className="issue-list">
            {issues.list > 0 ? (
                issues.map((item:Issues, key: number) =>
                    <section key={item.id} className={`issue-${item.number} issue`}>
                        <h1 className="issue-header">{item.title}</h1>
                        <div className="issue-body">{`#${item.number} opened ${moment(item.created_at).fromNow()} by ${item.user.login}`}</div>
                    </section>
                )
            ) : (<div>No Data</div>)
            }
        </div>
    )
}

export default IssueList;