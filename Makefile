.PHONY: fe be dev new-migration migrate

# Start frontend
fe:
	cd frontend && npm run dev

# Start backend
be:
	cd backend && uvicorn src.main:app --reload

# Start both simultaneously
dev:
	concurrently \
		--names "FE,BE" \
		--prefix-colors "blue,green" \
		"make fe" \
		"make be"

# Make a new database migration
new-migration:
	cd backend && alembic revision --autogenerate -m "$(m)"

# Migrate to new database
migrate:
	cd backend && alembic upgrade head