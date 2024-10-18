import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Car from '../../../models/Car';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const car = await Car.findById(id);
        if (!car) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: car });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const car = await Car.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!car) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: car });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedCar = await Car.deleteOne({ _id: id });
        if (!deletedCar) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}