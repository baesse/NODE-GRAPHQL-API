import { Dbconnection } from '../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import { Transaction } from 'sequelize';
import { PostInstance } from '../../../models/PostModel';
import { handleError } from '../../../utils/utils';

export const postResolvers = {
	Post: {
		comment: (parent, { first = 10, offset = 10 }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.Comment.findAll({
				where: { post: parent.get('id') },
				limit: first,
				offset: offset
			}).catch(handleError);
		},
		author: (parent, { first = 10, offset = 10 }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.User.findById(parent.get('author')).catch(handleError);
		}
	},
	Query: {
		posts: (parent, { first = 10, offset = 10 }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.Post.findAll({
				limit: first,
				offset: offset
			}).catch(handleError);
		},
		post: (parent, { id }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.Post.findById(id).then((post: PostInstance) => {
				if (!post) throw new Error(`Post with id ${id} not found!`);
				return post;
			}).catch(handleError);
		}
	},
	Mutation: {
		createPost: (parent, { input }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.sequelize.transaction((t: Transaction) => {
				return db.Post.create(input, { transaction: t });
			}).catch(handleError);
		},

		updatePost: (parent, { id, input }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			id = parseInt(id);
			return db.sequelize.transaction((t: Transaction) => {
				return db.Post.findById(id).then((post) => {
					if (!post) throw new Error(`Post with id ${id} not found!`);
					return post.update(input, { transaction: t });
				});
			}).catch(handleError);
		},
		deletePost: (parent, { id }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			id = parseInt(id);
			return db.sequelize.transaction((t: Transaction) => {
				return db.Post.findById(id).then((post: PostInstance) => {
					if (!post) throw new Error(`User with id ${id} not found!`);
					return post.destroy({ transaction: t }).then((post) => post);
				});
			}).catch(handleError);
		}
	}
};
