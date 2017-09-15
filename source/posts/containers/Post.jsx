import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api.js'

import styles from './Post.css';

class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			user: props.user || null,
			comments: props.comments || null,
		};
	}

	async componentDidMount() {
		if (!!this.state.user && !!this.state.comments) return this.setState({ loading: false });

		const [
			user,
			comments,
		] = await Promise.all([
				!this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
				!this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null),
			]);

		this.setState({
			loading: false,
			user: user || this.state.user,
			comments: comments || this.state.comments
		})
	}

	render() {
		return (
			<article id={`post-${this.props.id}`} className={styles.post}>
				<Link to={`/post/${this.props.id}`}>
					<h2 className={styles.title}>{this.props.title}</h2>
				</Link>

				<p className={styles.body}>
					{this.props.body}
				</p>

				{!this.state.loading && (
					<div className={styles.meta}>
						<Link to={`/user/${this.state.user.id}`} className={styles.user}>
							{this.state.user.name}
						</Link>
						
						<span className={styles.comments}>
							Hay {this.state.comments.length} Comentarios
						</span>
					</div>
				)}
			</article>
		)
	}
}

Post.propTypes= {
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
};

export default Post;