/* eslint-disable react/prop-types */
import './listcard.scss';
import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi';
import { arrowClick, deleteItem } from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';

const ListCard = ({ item }) => {
	const dispatch = useDispatch();

	const ArrowClick = (direction) => {
		dispatch(arrowClick(item, direction));
	};

	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};

	return (
		<div>
			<ul className={` ${item.status === 'done' ? 'completed menu' : 'menu'}`}>
				<li>
					<p>{item.displayId}</p> {/* Use displayId for sequential numbers */}
				</li>
				<li>
					<p>{item.task}</p>
				</li>
				<li>
					<p>{item.status}</p>
				</li>
				<li>
					<button
						disabled={item.status === 'backlog'}
						onClick={() => ArrowClick('left')}
					>
						<BiChevronLeft />
					</button>
					<button
						disabled={item.status === 'done'}
						onClick={() => ArrowClick('right')}
					>
						<BiChevronRight />
					</button>
					<button onClick={handleDelete}>
						<BiTrash />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ListCard;
